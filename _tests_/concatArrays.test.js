const concatArrays = require('../utils/concatArrays.js')

const Array1 = [
  '/blog',
  '/blog-2019',
  '/blog-2018'
]
const Array2 = [
  '/blog-2017',
  '/blog-2016',
  '/blog-2015'
]

const Array3 = [
  '/blog',
  '/blog-2019',
  '/blog-2018',
  '/blog-2017',
  '/blog-2016',
  '/blog-2015'
]


test(('concatenates two arrays'),()=>{
  expect(concatArrays(Array1, Array2)).toEqual(Array3)
})
