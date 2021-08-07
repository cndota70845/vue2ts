<template>
    <a-upload
        :file-list="fileList" 
        :remove="handleRemove" 
        :before-upload="beforeUpload"
        :preview="handlePreview"
    >
        <a-button v-if="fileList.length === 0"> <a-icon type="upload" /> 上传 </a-button>
    </a-upload>
</template>

<script lang="ts">

interface ILooseObject {
  [key: string]: any
}

import { Vue, Component, Prop, Model } from 'vue-property-decorator';
@Component
 
export default class fileUpload extends Vue {
    @Prop() defaultFile;
    @Prop(Number) fileId!:number;

    public fileList = [] as any[];
    @Model('upload') value!: File;
    mounted () :void{
        if (this.defaultFile !== null) {
            this.fileList.push(Object.assign(this.defaultFile,{uid:`${this.fileId}-${new Date}`,status: 'done'}));
        }
    }

    beforeUpload (file:File) :boolean{
        this.fileList = [(file as File)];
        this.$emit( 'upload' , {id:this.fileId, file:file});
        return false;
    }

    async handleRemove (file:{id:number}) :Promise<void>{
        const params = {
            id: file.id
        }
        this.$emit( 'delete' , params);
    }

    handlePreview () :void{
        console.log(arguments);
    }

}
</script>

<style>

</style>