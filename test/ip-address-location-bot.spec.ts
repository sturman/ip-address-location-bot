import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IpAddressLocationBotStack } from '../lib/ip-address-location-bot-stack';

let template: Template;

describe('IpAddressLocationBotStack', () => {
  beforeAll(() => {
    const app = new cdk.App();
    const stack = new IpAddressLocationBotStack(app, 'ip-address-location-bot-stack', {});
    template = Template.fromStack(stack);
  });

  it('should create Lambda Function', () => {
    template.hasResource('AWS::Lambda::Function', {});
  });

  it('should create Lambda Function URL', () => {
    template.hasResource('AWS::Lambda::Url', {});
  });

  it('should create SSM parameter', () => {
    template.hasResourceProperties('AWS::SSM::Parameter', {
      Name: 'ip-address-location-bot-function-url',
      Type: 'String',
    });
  });

  it('should create CloudWatch Dashboard', () => {
    template.hasResource('AWS::CloudWatch::Dashboard', {});
  });
});
