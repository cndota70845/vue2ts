import axios from '../../http'; // 导入http中创建的axios实例

interface IgetUserGET {
    page_size:number,
    page_current:number
    search?:string
}

const filed = {
    //表格列表Get
    getUserGET (params:IgetUserGET) :any{        
        return axios.get(`/api/getUser/`,{params:params});   
    },
    deleteUserDELETE (params: {id?:string}) :any{        
        return axios.get(`/api/deleteUser/`,{params:params});   
    },
    editUserPatch (params: {name?:string,id?:number,password?:string}) :any{        
        return axios.post(`/api/editUser/`,params as any);   
    },
    addUserPost (params: {name?:string, password?:string}) :any{
        return axios.post(`/api/addUser/`,params as any);
    },
    fileUpload (params: {id?:number, file?:File}) :any{
        return axios.post(`/api/fileUpload/`,params as any,{headers:{'Content-Type':'multipart/form-data;charset=UTF-8'}})
    },
    fileDelete (params: {id?:string}) :any{
        return axios.get(`/api/fileDelete/`,{params:params});
    }
}
export default filed;