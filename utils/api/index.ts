import axios from 'axios'

// export const getCategories = async () => {
//   const { data } = await axios.get('http:0.0.0.0:3333/categories')
//   return data
// }

export const getCategories = () =>
  fetch(
    'https://api.github.com/repos/tannerlinsley/react-query'
  ).then((res) => res.json())
