function TestComponent({ data, callback }) {
  return (
    <>
      <h1>{data}</h1>
      <button
        onClick={() => callback("This was changed by the child component.")}
        className="btn btn-primary"
      >
        Change Message
      </button>
    </>
  );
}

function TestComponent2({ data, callback }) {
  return (
    <>
      <TestComponent
        data={data}
        callback={() => callback("This passed through 2 layers to be changed.")}
      />
    </>
  );
}

export default TestComponent;
export { TestComponent2 };
