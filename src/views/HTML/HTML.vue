<template>
    <div>
        This is an HTML page
    </div>
</template>

<script lang="ts">

interface ILooseObject {
  [key: string]: any
}

import { Vue,Component } from 'vue-property-decorator';
@Component({})
export default class HTML extends Vue {
    created () :void{
        // const arr = ['小明','小李','小刘','小赵','小红'];
        // const arr1 = [1,2,'你不好',4,5,'你很好',7,8,9,10];
        // console.log('索引',Array.from(arr.keys()));
        // console.log('values',Array.from(arr.values()));
        // console.log('索引/值对',Array.from(arr.entries()));
        // console.log(arr1.fill('你好',-5,-1));
        // arr1.copyWithin(5,0);
        // console.log(arr1.toString(),arr1.valueOf(),arr1.join('||'));
        // const arr2 = [];
        // arr2.push(1,'你好',2);
        // let str = arr2.pop();
        // let str2 = arr2.shift();
        // let str3 = arr2.unshift('haha');//返回数组长度
        // console.log(arr2,str,str2,str3,arr2.reverse());
        // const arr3 = [1,2,3,'4',99,88,'101','-2',0,'0','777'];
        // function SortsFuc (left:string | number,right:string | number) :number{
        //     if (parseInt(left.toString()) > parseInt(right.toString())) {
        //         return 1;
        //     }
        //     else if (parseInt(left.toString()) < parseInt(right.toString())) {
        //         return -1;
        //     }
        //     else {
        //         return 0;
        //     }
        // }
        // console.log(arr3.sort(SortsFuc));
        // arr3[Symbol.isConcatSpreadable] = false;
        // let test1 = [].concat(arr1,arr3);
        // test1.splice(0,5);
        // test1.splice(0,0,'嘿嘿','呵呵');
        // test1.splice(0,1,'替换');
        // console.log(test1,test1.indexOf('替换'),test1.lastIndexOf('替换'));
        // const arr4 = [
        //     {
        //         name:'马克',
        //         age:32
        //     },
        //     {
        //         name:'李昂',
        //         age:28
        //     },
        //     {
        //         name:'萨菲罗斯',
        //         age:22
        //     }
        // ]
        // let data = arr4.find(element => element.age > 22);//返回第一个匹配的元素
        // let data1 = arr4.findIndex(element => element.age > 22);
        // let sum = arr3.reduce((prev,cur) => parseInt(String(prev)) + parseInt(String(cur)),0);
        // console.log(data,data1,sum);
        // const buf = new ArrayBuffer(16);
        // const fullDataView = new DataView(buf);
        // console.log(fullDataView.byteLength,fullDataView.byteOffset);
        // const myMap = new Map([
        //     ['name','李昂'],
        //     ['age','28'],
        //     ['job','gunner']
        // ]);
        // const test = Symbol();

        // const myMap2 = new Map();

        // myMap2.set('skill','neverLost');
        // myMap2.set(test,'你好');
        // console.log(myMap,myMap2,myMap2.get('skill'),myMap2.has('name'));
        // for (let pair of myMap.entries()) {
        //     console.log(pair);
        // }
        // myMap.forEach((val,key) => {
        //     console.log(`${key}--${val}`);
        // });
        // const myWeakMap = new WeakMap();
        // const key = {name:'里昂',age:28};
        // const key2 = {name:'马克',age:33};
        // const value = {
        //     power:200,
        //     iq:121,
        //     hp:1000,
        //     mp:300
        // }
        // const value2 = {
        //     power:300,
        //     iq:108,
        //     hp:1800,
        //     mp:150
        // }
        // myWeakMap.set(key,value)
        //         .set(key2,value2);
        // console.log(myWeakMap,myWeakMap.has(key));
        const arr5 = ['xiaoming','xiaohong','xiaogang'];
        let iter = arr5[Symbol.iterator]();
        console.log(iter,iter.next(),iter.next(),iter.next(),iter.next());
        for (let val of arr5) {
            console.log(val);
        }
        this.init();
    }
    async init () :Promise<void>{
        const res = await (this as ILooseObject).$api.user.getUserGET();
        console.log(res);
    }
}
</script>

<style>

</style>