const findObject = (values: any, id: number | string) => (values.find((item) => item.id === id));
export default findObject;
