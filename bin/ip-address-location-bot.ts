#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IpAddressLocationBotStack } from '../lib/ip-address-location-bot-stack';

const app = new cdk.App();
new IpAddressLocationBotStack(app, 'IpAddressLocationBotStack', {});
