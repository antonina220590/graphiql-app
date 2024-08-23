export default function RESTfullClient() {
  return (
    <main className="flex-grow p-4 bg-light">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xxl font-bold mb-4 text-center w-full">
          REST Client
        </h1>
        <div className="flex space-x-4 mb-4">
          <select>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            type="text"
            placeholder="Endpoint URL"
            className="border-2 p-2 rounded flex-grow bg-dark text-white focus:border-yellow-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Headers:</h2>
          <button className="bg-[#fe6d12] text-white p-2 rounded border hover:border-[#292929] transition duration-300">
            Add Header
          </button>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Body:</h2>
          <textarea
            placeholder="JSON/Text Editor"
            className="border-2 p-2 rounded w-full h-32 bg-dark text-white focus:border-yellow-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="font-semibold">Response:</div>
      <div className="flex items-center mb-2">
        <div className="mr-2">Status:</div>
        <div className="border p-2 rounded bg-dark flex-1 text-white">
          HTTP Status Code
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-5">Body:</div>
        <div className="border p-2 rounded bg-dark flex-1 text-white">
          Read-Only JSON Viewer
        </div>
      </div>
    </main>
  );
}
