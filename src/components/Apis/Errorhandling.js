export const ErrorHandler = (e)=>
{
  console.log('inside Eror Handler',e)
  alert(`${e?.response?.data?.message ? e?.response?.data?.message :"error handler" }`)
}