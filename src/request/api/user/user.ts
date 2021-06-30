import axios from '../../http'; // 导入http中创建的axios实例

const filed = {
    //表格列表Get
    getUserGET (params: {name?:string,id?:number,password?:string}) :any{        
        return axios.get(`/api/getUser/`,{params:params});   
    },
    deleteUserDELETE (params: {id?:string}) :any{        
        return axios.get(`/api/deleteUser/`,{params:params});   
    },
    editUserPatch (params: {name?:string,id?:number,password?:string}) :any{        
        return axios.post(`/api/editUser/`,params as any);   
    },
    addUserPost (params: {name?:string, password?:string}) :any{
        return axios.post(`/api/addUser`,params as any);
    }
}
export default filed;