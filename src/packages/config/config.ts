import ConfigurationInterface from "./configuration";

export default interface Config {
  getConfiguration(): ConfigurationInterface;
}