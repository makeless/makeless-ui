import Data from './data';

export default interface Handler {
  (data: Data): void
}
