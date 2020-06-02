import ConfigurationInterface from "./configuration";

export default interface Config {
  /**
   * Returns parsed configuration
   */
  getConfiguration(): ConfigurationInterface;
}