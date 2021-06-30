<template>
    <div class="HTML">
        <a-table 
            :dataSource="dataSource" 
            :columns="columns" 
            :rowKey="rowKey"
            bordered
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
    </div>
</template>

<script lang="ts">

interface ILooseObject {
  [key: string]: any
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
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align:'center',
        scopedSlots: { customRender: 'action' }
    }
]

import { Vue, Component } from 'vue-property-decorator'; 
import { message } from 'ant-design-vue';
@Component({})
export default class HTML extends Vue {
    public dataSource :{id:string}[] = [];
    public columns = columns;
    public rowKey = 'id';
    public formModal = false;
    public deleteModal = false;
    public chooseID = '';
    public editingKey:ILooseObject = {};

    created () :void{
        this.init();
    }

    init () :void{
        this.update();
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
        const res = await (this as ILooseObject).$api.user.getUserGET();
        if (res && res.data.code === 1) {
            this.dataSource = res.data.data;
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
        console.log(params);
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