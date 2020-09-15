import React,{Component} from 'react'
import {Icon, List, Toast, NavBar,WingBlank,WhiteSpace} from 'antd-mobile'
import Account from "../../../components/account/account";
import {utils} from "../../../config/utils";
import jsuperzk from 'jsuperzk'
import {keys, lang, storage, url,config} from "../../../config/common";
import {assetService} from "../../../components/service/service";
import './historyPkr.css'

let account = new Account();
const Item = List.Item;
const Brief = Item.Brief;

class HistoryPkr extends Component{

    constructor(props) {
        super(props);
        this.state={
            current:{},
            pkrs:[],
            currentBlock:0,
        }
    }

    componentDidMount() {
        const that = this;
        Toast.loading("loading...")
        setTimeout(function () {
            that.loadData();
        },300)

        let logger = document.getElementById('log');
        console.log = function (message) {
            if (message.indexOf('span')>-1){
                logger.innerHTML = `<div><small>${new Date().toLocaleTimeString()}</small>${message}</div>` + logger.innerHTML;
                const childs = logger.childNodes;
                if(childs.length>100){
                    for(let i = 100; i < childs.length; i++) {
                        logger.removeChild(childs[i])
                    }
                }
            }
        }
    }

    loadData=()=>{
        const that = this;
        account.getCurrent().then(current=>{
            that.setState({
                current:current
            })
            assetService.getPKrIndex(current.tk).then(data=>{
                const pkrIndex = data.PkrIndex;
                const currentBlock =  data.CurrentBlock;
                account = new Account(current.address);
                account.Keystore().then(keystore=>{
                    let version = keystore.version;
                    let pkrTemp = [];
                    pkrTemp.push(<div>
                        <Item extra={<span className="text-dark">Index</span>}><span style={{fontSize:"14px"}} className="text-dark">PKr</span></Item><WhiteSpace/>
                    </div>)

                    let inend = 0;
                    if(pkrIndex>10){
                        inend = pkrIndex-10;
                    }
                    for (let i=pkrIndex;i>inend;i--){
                        let tempPkr = jsuperzk.createPkrHash(current.tk,i,version);
                        pkrTemp.push(
                            <div>
                                <Item extra={<span className="text-dark">{i}</span>}><span style={{fontSize:"14px"}} className="text-dark">{tempPkr}</span></Item>
                                <WhiteSpace/>
                            </div>
                        )
                    }
                    that.setState({
                        pkrs : pkrTemp,
                        currentBlock:currentBlock
                    })
                })
            })
        });

    }

    render() {
        return (
            <div>
                <div className="layout-top">
                <NavBar
                    mode="light"
                    style={{background: "#1f1f1f"}}
                    leftContent={<Icon type="left" onClick={() => {
                        url.goBack()
                    }}/>}
                >
                    {lang.e().page.setting.pkr}
                </NavBar>
                </div>
                <div style={{marginTop:'45px'}}>
                    <h2 style={{textAlign:"center"}} className="text-primary">Block height : {this.state.currentBlock}</h2>
                </div>
                <div style={{height:document.documentElement.clientHeight*0.3, overflowY: 'scroll'}}>
                    <WingBlank>
                    <List>
                        {this.state.pkrs}
                    </List>
                    </WingBlank>
                </div>
                <div>
                    <h2 style={{textAlign:"center"}} className="text-primary">Synchronized data log</h2>
                </div>
                <div style={{height:document.documentElement.clientHeight*0.6,overflowY: 'scroll'}}>
                    <div id={"log"} style={{background:"#d6b781",color:"#1f1f1f"}} >

                    </div>
                </div>
            </div>
        )
    }


}

export default HistoryPkr