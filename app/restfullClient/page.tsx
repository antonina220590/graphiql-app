export default function RESTfullClient() {
  return (
    <main className="flex-grow p-4 bg-[#f1cdb3]">
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
            className="border p-2 rounded flex-grow"
          />
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Headers:</h2>
          <button className="bg-[#fddcc4] text-[#292929] p-2 rounded border hover:border-[#292929] transition duration-300">
            Add Header
          </button>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Body:</h2>
          <textarea
            placeholder="JSON/Text Editor"
            className="border p-2 rounded w-full h-32"
          />
        </div>
      </div>

      <div className="font-semibold">Response:</div>
      <div className="flex items-center mb-2">
        <div className="mr-2">Status:</div>
        <div className="border p-2 rounded bg-gray-100 flex-1">
          HTTP Status Code
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-5">Body:</div>
        <div className="border p-2 rounded bg-gray-100 flex-1">
          Read-Only JSON Viewer
        </div>
      </div>
    </main>
  );
}
