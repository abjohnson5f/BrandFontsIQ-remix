export default function TestBasic() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Basic Test</h1>
      <form method="post">
        <button 
          type="submit"
          name="action"
          value="clicked"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Click me (uses form post)
        </button>
      </form>
    </div>
  );
}

export async function action() {
  console.log("Button was clicked!");
  return null;
}