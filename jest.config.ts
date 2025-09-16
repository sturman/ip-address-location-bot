import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['./**/src/**/*.ts'],
  passWithNoTests: true,
  coveragePathIgnorePatterns: ['jest.config.ts', '.spec.ts$'],
  coverageDirectory: 'coverage',
  clearMocks: true,
  coverageReporters: ['cobertura', 'text', 'lcov', 'html'],
  reporters: [['github-actions', { silent: false }], 'summary'],
};

export default config;
