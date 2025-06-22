const Sidebar = () => {
  return (
    <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto border-r">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>
      <ul className="space-y-2">
        <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-200">Math Chat</li>
        <li className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-200">Physics Help</li>
      </ul>
    </div>
  );
};

export default Sidebar;
