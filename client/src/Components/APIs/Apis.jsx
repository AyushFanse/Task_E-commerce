import Axios from 'axios';

// eslint-disable-next-line no-undef
export const GetProducts = async () => {
    let data = await Axios.get('http://localhost:3001/product/get/all')
    return data
};

