<template>
    <a-upload
        :defaultFileList="defaultFileList"
        :file-list="fileList" 
        :remove="handleRemove" 
        :before-upload="beforeUpload"
    >
        <a-button> <a-icon type="upload" /> 上传 </a-button>
    </a-upload>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model} from 'vue-property-decorator';
@Component
 
export default class fileUpload extends Vue {
    @Prop([String, Object]) defaultFile!:string | null;
    @Prop(Number) fileId!:number;

    public fileList = [] as any[];
    public defaultFileList = [] as any[];
    @Model('upload') value!: File;
    created () :void{
        if (this.defaultFile !== null) {
            console.log(this.defaultFile);
        }
    }

    beforeUpload (file:File) :boolean{
        this.fileList = [(file as File)];
        this .$emit( 'upload' , {id:this.fileId, file:file});
        return false;
    }

    handleRemove (file:File) :void{
        console.log('delete',file)
    }

}
</script>

<style>

</style>