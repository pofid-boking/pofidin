import React,{Component} from 'react'
import {Icon, NavBar, Toast,Tag} from 'antd-mobile'
import QRCode from 'qrcode';
import copy from "copy-text-to-clipboard/index"
import Account from "../../components/account/account";
import './transfer.css'
import {storage, keys, config, url, baseDecimal, lang} from "../../config/common";

class Receive extends Component{

    constructor(props) {
        super(props);
        this.state = {
            prk:'',
            tips:'',
            name:'',
            act:{}
        }
    }

    componentDidMount() {
        const that = this;
        let address = this.props.match.params.address;
        let pkrType = this.props.match.params.type;
        let account = new Account(address);
        account.Detail(address).then(detail=>{
            let pkr = detail.currentPKr;
            let tips = lang.e().modal.pkr;
            if(pkrType === 'mainPKr'){
                pkr = detail.mainPKr;
                tips = lang.e().modal.mainPKr;
            }
            let canvas = document.getElementById('qrImg')
            QRCode.toCanvas(canvas, pkr, function (error) {
                if (error) console.error(error)
            });
            that.setState({
                pkr:pkr,
                tips:tips,
                act:detail,
            })
        });

    }

    render() {


        return <div style={{height:document.documentElement.clientHeight}}>
            <NavBar
                mode="light"
                style={{background: "#1f1f1f"}}
                icon={<Icon type="left"/>}
                onLeftClick={() => {
                    // window.location.replace("/#/transfer/list");
                    url.goBack();
                }}
                // style={{backgroundColor:"#1d1f20"}}
            >
                <span style={{color:"#1d1f20"}}>{this.props.match.params.type==="pkr"?lang.e().page.wallet.PKr:lang.e().page.wallet.mainPKr}</span>
            </NavBar>

            <div className="transfer-receive-border">
                <div className="transfer-receive-icon">
                    <Icon type={this.state.act.avatar} style={{width:"40px",height:"40px"}}/>
                </div>
                <div className="transfer-receive-header" >
                    <strong className="text-primary">{this.state.act.name}</strong><br/>
                    <div className="transfer-receive-header-hash" onClick={()=>{
                        copy(this.state.pkr);
                        Toast.success(lang.e().toast.success.copy, 1);
                    }}>{this.state.pkr}
                    <Icon type="iconcopy" style={{width:"14px",height:"14px"}} /></div>
                </div>
                <div className="transfer-receive-body" style={{height:document.documentElement.clientHeight * 0.6}} >
                    <canvas id="qrImg"/><br/>
                    <p style={{color:"#dfab14"}}>{this.state.tips}</p>
                </div>
            </div>
        </div>
    }

}

export default Receive