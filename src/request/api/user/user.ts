import axios from '../../http'; // 导入http中创建的axios实例

const filed = {
    //表格列表Get
    getUserGET (params: {name?:string,id?:number,password?:string}) :any{        
        return axios.get(`/api/getUser/`,{params:params});   
    }
}
export default filed;