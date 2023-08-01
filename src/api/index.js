import axios from 'axios'

/*

Pricing Option Enum
PAID = 0
FREE = 1
VIEW_ONLY = 2

*/

export const getData = () => (axios.get('https://closet-recruiting-api.azurewebsites.net/api/data'))

