import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/styleDataTableController.getAccounts';
import { loadStyle } from 'lightning/platformResourceLoader';
import datatablecolor from '@salesforce/resourseUrl/datatablecolor';
const COLUMNS = [
    {label : 'AccountName' ,fieldName : 'Name',
    cellAttributes: {
        class : {fieldName: 'accountColor'}
    }
    },
    {label : 'Annual Revenue' ,fieldName : 'AnnualRevenue', type :'currency',
    cellAttributes: {
        class : {fieldName: 'amountColor'},
        iconName : {fieldName : 'iconName'}, iconPosition : 'right'
    }
},
    {label : 'Industry' ,fieldName : 'Industry',
    cellAttributes: {
        class : {fieldName: 'industryColor'}
    }
    },
    {label : 'Phone' ,fieldName : 'Phone', type: 'phone'},
];
export default class StyleDataTable extends LightningElement {
    tableData;
    tableColumn = COLUMNS;
    isCssLoaded = false;
    @wire(getAccounts)
    accountHandler({data,error}) {
        if(data){
            this.tableData = data.map(item=> {
              let amountColor = item.AnnualRevenue<50000?"slds-text-color_error":"slds-text-color_success";
              let iconName = item.AnnualRevenue<50000?"utility:down":"utility:up";
              return {...item,
                  "amountColor": amountColor,
                  "iconName": iconName,
                  "industryColor": "slds-icon-custom25 slds-text-color_default",
                  "accountColor": "dataTable-green"
            }

            })
        }
        if(error){
            console.error(error);
        }
        }
        renderedCallback(){
            if(this.isCssLoaded) return
            loadStyle(this,datatablecolor).then(()=> {
                this.isCssLoaded = true;
            }).catch(error=>{
                console.error("Error is loading in css");
            })
        }
}