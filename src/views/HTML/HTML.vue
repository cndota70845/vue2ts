<template>
    <div class="HTML">
        <div class="titile">
            <a-button type="primary" @click="formModal = true" :style="{'width':'80px'}">新建</a-button>
        </div>
        <a-table 
            :dataSource="dataSource" 
            :columns="columns" 
            :rowKey="rowKey"
            bordered
        >
            <div slot="action" slot-scope="text, record">
                <a-button type="danger" @click="confirm(record)">删除</a-button>
            </div>
        </a-table>
        <a-modal
            title="提示"
            :visible="deleteModal"
            @ok="() => remove()"
            @cancel="() => cancel()"
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
        align:'center'
    },
    {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
        align:'center'
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
    public dataSource = [];
    public columns = columns;
    public rowKey = 'id';
    public formModal = false;
    public deleteModal = false;
    public chooseID = undefined;

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
        this.cancel();
    }


    cancel () {
        this.chooseID = undefined;
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
    
}
</script>

<style lang="less" scoped>
  @import '../../assets/less/html.less';
</style>