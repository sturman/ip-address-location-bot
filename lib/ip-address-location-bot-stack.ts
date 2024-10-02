import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import * as path from 'node:path';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Dashboard, LogQueryVisualizationType, LogQueryWidget } from 'aws-cdk-lib/aws-cloudwatch';

export class IpAddressLocationBotStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // AWS SSM string parameters should be created manually
    const botToken = StringParameter.valueForStringParameter(this, 'ip-address-location-bot-token');

    const nodeJsFunctionProps: NodejsFunctionProps = {
      functionName: `ip-address-location-bot`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      entry: path.join(__dirname, `/../functions/ip-address-location-bot/index.ts`),
      environment: {
        BOT_TOKEN: botToken,
      },
      bundling: {
        externalModules: [],
        nodeModules: ['@aws-lambda-powertools/logger'],
      },
    };

    const nodeJsFunction = new NodejsFunction(this, 'ip-address-location-bot', nodeJsFunctionProps);
    const lambdaUrl = nodeJsFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    new StringParameter(this, 'ip-address-location-bot-function-url', {
      parameterName: 'ip-address-location-bot-function-url',
      stringValue: lambdaUrl.url,
    });

    const dashboard = new Dashboard(this, 'ip-address-location-bot-cw-dashboard', {
      dashboardName: 'ip-address-location-bot',
    });
    const logQueryWidget = new LogQueryWidget({
      logGroupNames: [nodeJsFunction.logGroup.logGroupName],
      view: LogQueryVisualizationType.TABLE,
      width: 24,
      height: 18,
      queryLines: [
        'fields @timestamp, level, ' +
          'body.message.chat.first_name as first_name, body.message.chat.last_name as last_name, body.message.chat.username as username, body.message.text as text',
        'filter @message like /update_id/',
      ],
    });
    dashboard.addWidgets(logQueryWidget);
  }
}
