interface IMenu {
    key:string,
    name:string,
    icon:string,
    path:string,
    children?:IMenu[]
}

interface IFlaot {
    key:string,
    name:string,
    icon:string,
    parent?:string,
    path:string,
    idx:string,
    parentPath?:string
}

function floatMenu (orgin:IMenu[]) :IFlaot[]{
    const target:IFlaot[] = [];
    let index = 1;
    orgin.forEach(item => {
        if (item.children) {
            target.push({
                key:item.key,
                name:item.name,
                icon:item.icon,
                path:item.path,
                idx:`sub-${index}`
            });
            index++;
            if (item.children.length > 0) {
                item.children.forEach(element => {
                    target.push({
                        key:element.key,
                        name:element.name,
                        icon:element.icon,
                        parent:item.key,
                        path:item.path,
                        parentPath:item.path,
                        idx:`${index}`
                    });
                    index++;
                });
            }
        }
        else {
            target.push({
                key:item.key,
                name:item.name,
                icon:item.icon,
                idx:`${index}`,
                path:item.path,
            });
            index++;
        }
    });
    return target;
}

export default {
    floatMenu
}
