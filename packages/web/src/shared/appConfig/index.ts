export type Environment = 'development' | 'production' | 'test';
export type TestScript = 'test-unit' | 'test-infra' | 'test-e2e';

interface ConfigProps {
  environment: Environment;
  script: TestScript;
}

export class AppConfig {
  private readonly props: ConfigProps;

  constructor(props: ConfigProps) {
    this.props = {
      environment: props.environment,
      script: process.env.TEST_SCRIPT as TestScript || props.script
    };
  }

  public getEnvironment() {
    return this.props.environment;
  }

  public getScript() {
    return this.props.script;
  }

  public useMocks() {
    return this.getEnvironment() === 'test' && this.getScript() === 'test-unit';
  }
}