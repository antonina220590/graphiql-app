import { SelectMethodProps } from '../types';

const SelectMethod: React.FC<SelectMethodProps> = ({ method, setMethod }) => (
  <select value={method} onChange={(e) => setMethod(e.target.value)}>
    <option value="GET">GET</option>
    <option value="POST">POST</option>
    <option value="PUT">PUT</option>
    <option value="DELETE">DELETE</option>
  </select>
);
export default SelectMethod;
