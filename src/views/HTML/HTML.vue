<template>
    <div class="HTML">
        <a-affix :offset-top="top">
            <div class="add">
                <a-button
                    style="width: 60px"
                    @click="onChangeModel(true)"
                >+</a-button>
            </div>
        </a-affix>
        <a-table 
            :dataSource="dataSource" 
            :columns="columns" 
            :rowKey="rowKey"
            bordered
            :pagination="false"
        >
            <template
                v-for="col in ['name', 'password']"
                :slot="col"
                slot-scope="text, record"
            >
                <div contenteditable="" :key="col">
                    <a-input
                        v-if="record.editable"
                        style="margin: -5px 0"
                        :defaultValue="text"
                        @change="e => handleChange(e.target.value, col)"
                    />
                    <template v-else>
                    {{ text }}
                    </template>
                </div>
            </template>
            <template
                slot="personalFile"
                slot-scope="text, record"
            >
                <fileUpload
                    :defaultFile="isNull(record.file)?null:record.file"
                    :key="onKey(record.id)"
                    :fileId="record.id"
                    @upload="onFileChange"
                    @delete="onFileDelete"
                ></fileUpload>
            </template>
            <div slot="action" slot-scope="text, record">
                <span v-if="record.editable">
                    <a-button @click="() => save()" class="BTN" type="primary">保存</a-button>
                    <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record)">
                        <a-button type="danger" class="BTN">取消</a-button>
                    </a-popconfirm>
                </span>
                <span v-else>
                    <a-button type="primary" :disabled="editingKey.hasOwnProperty('id')?true:false" @click="() => edit(record)" class="BTN">编辑</a-button>
                    <a-button type="danger" @click="confirm(record)" class="BTN">删除</a-button>
                </span>
            </div>
        </a-table>
        <a-row type="flex" justify="end" class="pagination">
            <a-pagination  
                show-quick-jumper 
                :defaultPageSize="pagination.size"
                :total="pagination.total"
                v-model="pagination.current"
                @change="onChangePage" 
            />
        </a-row>
        <a-modal
            title="提示"
            :visible="deleteModal"
            @ok="() => remove()"
            @cancel="() => clear()"
            :closable="false"
            :maskClosable="false"
            >
            <p>是否删除该条数据</p>
        </a-modal>
        <a-modal 
            :visible="addModal" 
            title="新增数据"
            :closable="false"
            :maskClosable="false"
        >
            <template slot="footer">
                <a-button 
                    key="back" 
                    @click="onChangeModel(false)"
                >Return
                </a-button>
                <a-button 
                    key="submit" 
                    type="primary" 
                    :loading="loading" 
                    @click="onSubmit()"
                >Submit
                </a-button>
            </template>
            <div class="form">
                <a-form :form="form">
                    <a-form-item
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        label="用户名"
                        class="form_item"
                    >
                        <a-input
                            placeholder="Please input your name"
                            v-decorator="rules.username"
                        />
                    </a-form-item>
                    <a-form-item
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        label="密码"
                        class="form_item"
                    >
                        <a-input-password
                            placeholder="Please input your name"
                            v-decorator="rules.password"
                        />
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts">

interface ILooseObject {
  [key: string]: any
}

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};

const rules = {
    username:[
        'name',
        { rules: [{ required: true, message: 'Please input your username!' }] }
    ],
    password:[
        'password',
        { rules: [{ required: true, message: 'Please input your password!' }] }
    ]
}

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align:'center'
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align:'center',
        scopedSlots: { customRender: 'name' }
    },
    {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
        align:'center',
        scopedSlots: { customRender: 'password' }
    },
    {
        title: '个人简介',
        dataIndex: 'personalFile',
        key: 'personalFile',
        align:'center',
        scopedSlots: { customRender: 'personalFile' }
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align:'center',
        scopedSlots: { customRender: 'action' }
    }
]

import { Vue, Component } from 'vue-property-decorator'; 
import { message } from 'ant-design-vue';
import fileUpload from './fileUpload.vue';

@Component({
    components: {
        fileUpload
    }
})
export default class HTML extends Vue {
    public dataSource :{id:string}[] = [];
    public columns = columns;
    public rowKey = 'id';
    public formModal = false;
    public deleteModal = false;
    public chooseID = '';
    public editingKey:ILooseObject = {};
    public addModal = false;
    public loading = false;
    public top = 10;
    public formItemLayout = formItemLayout;
    public form = null;
    public rules = rules;
    public pagination = {
        current: 1,
        total: 0,
        size: 10
    }

    onKey (id: number) :string{
        return `${id}_${new Date()}`;
    }

    created () :void{
        this.form = (this as ILooseObject).$form.createForm(this, {});
        this.init();
    }

    init () :void{
        this.update();
    }

    onChangeModel (val:boolean):void {
        this.addModal = val;
        if (!val) {
            (this as ILooseObject).form.resetFields();
        }
    }

    isNull (obj:{any}) :boolean{
        var sign = false;
        for (let k in obj) {
            sign = obj[k] === null
                ? true
                : false;
        }
        return sign;
    }

    async onFileChange () :Promise<void>{
        const params = new FormData();
        const obj = arguments[0];
        for (let key in obj) {
            params.append(key,obj[key]);
        }
        const res = await (this as ILooseObject).$api.user.fileUpload(params);
        if (res && res.data.code === 1) {
            message.info(res.data.msg);
            this.update();
        }
    }

    async onFileDelete () :Promise<void>{
        const params = arguments[0];
        const res = await (this as ILooseObject).$api.user.fileDelete(params);
        if (res && res.data.code === 1) {
            message.info(res.data.msg);
            this.update();
        }
    }

    onChangePage ():void {
        this.update ();
    }

    onSubmit () :void {
        (this as ILooseObject).form.validateFields(async (errors, values) => {
            if (!errors) {
                const res = await (this as ILooseObject).$api.user.addUserPost(values);
                if (res && res.data.code === 1) {
                    this.update();
                    message.info(res.data.msg);
                }
                else if (res.data.msg) {
                    message.warning(res.data.msg);
                }
                this.onChangeModel(false);
            }
            else {
                message.error('表单验证错');
            }
        });
    }

    async remove () :Promise<void>{
        const params = {
            id:this.chooseID
        }
        const res = await (this as ILooseObject).$api.user.deleteUserDELETE(params);
        if (res && res.data.code === 1) {
            this.update();
        }
        else if (res.data.msg) {
            message.warning(res.data.msg);
        }
        this.clear();
    }

    clear () :void{
        this.chooseID = '';
        this.deleteModal = false;
    }

    confirm (record: {id:string}) :void{
        this.chooseID = record.id;
        this.deleteModal = true;
    }

    async update () :Promise<void>{
        const params = {
            page_size:10,
            page_current: this.pagination.current
        }
        const res = await (this as ILooseObject).$api.user.getUserGET(params);
        if (res && res.data.code === 1) {
            this.dataSource = res.data.data;
            this.pagination.total = res.data.total;
        }
    }

    handleChange (value:string, col:string) :void{
        this.editingKey[col] = value;
    }

    edit(record :ILooseObject) :void{
        let id = record && record.id || -1;
        if (id >= 0) {
            const data = (this.dataSource as {id:string}[]).map((item)=>{
                if (item.id == id) {
                    let newItem = item;
                    newItem['editable'] = true;
                    return newItem;
                }
                else {
                    return item;
                }
            });
            this.dataSource = data;
            this.editingKey = {
                id:id
            }
        }
    }

    async save() :Promise<void>{
        const params = this.editingKey;
        const res = await (this as ILooseObject).$api.user.editUserPatch(params);
        if (res && res.data.code === 1) {
            message.info(res.data.msg);
            this.editingKey = {};
            this.update();
        }
    }

    cancel(record :ILooseObject) :void{
        let id = record && record.id || -1;
        if (id >= 0) {
            const data = (this.dataSource as {id:string,editable?:boolean}[]).map((item)=>{
                if (item.id == id) {
                    let newItem = item;
                    delete newItem.editable;
                    return newItem;
                }
                else {
                    return item;
                }
            });
            this.dataSource = data;
        }
        this.editingKey = {};
    }
}
</script>

<style lang="less" scoped>
  @import '../../assets/less/html.less';
</style>