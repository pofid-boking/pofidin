import React, {Component} from 'react'
import {NavBar, TabBar, Icon} from 'antd-mobile'
import './layout.css'
import {storage, keys, config, url, baseDecimal, lang} from "../../config/common";

// const showDataVersion = ['1.0','1.1.4']

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDApp:false
        }
    }

    componentDidMount() {
        if (window.frames.length !== parent.frames.length){
            this.setState({
                showDApp:false
            })
        }else{
            this.setState({
                showDApp:true
            })
        }
        // const that = this;
        // if(plus && plus.runtime){
        //     const version = plus.runtime.version;
        //     showDataVersion.forEach((v)=>{
        //         if(version === v){
        //             that.setState({
        //                 showDApp:true,
        //             })
        //         }
        //     })
        // }else{
        //     that.setState({
        //         showDApp:true,
        //     })
        // }
    }

    render() {
        const { showDApp } = this.state;

        return <div>

            {this.props.children}

            <div className="tabbar">
                <TabBar barIntColor="#1e1f20" tintColor="#e5bb74" noRenderContent={true}>
                    <TabBar.Item
                        icon={<Icon type="iconzhanghuzichan"/>}
                        selectedIcon={<Icon type="iconzhanghuzichan" className="text-primary"/>}
                        title={lang.e().navbar.wallet}
                        key="home"
                        selected={this.props.selectedTab === 'home'}
                        onPress={()=>{
                            url.goPage(url.Home,"")
                        }}
                    >
                    </TabBar.Item>
                    {/*<TabBar.Item*/}
                    {/*    icon={<Icon type="iconStaking"/>}*/}
                    {/*    selectedIcon={<Icon type="iconStaking1"/>}*/}
                    {/*    title="Stake"*/}
                    {/*    key="stake"*/}
                    {/*    selected={this.props.selectedTab === 'stake'}*/}
                    {/*    onPress={()=>{*/}
                    {/*        url.goPage(url.Stake,"")*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*</TabBar.Item>*/}
                    {
                        showDApp===true?<TabBar.Item
                                icon={<Icon type="icontabbiaoqiancaidan"/>}
                                selectedIcon={<Icon type="icontabbiaoqiancaidan" className="text-primary"/>}
                                title={lang.e().navbar.dapp}
                                key="dapp"
                                selected={this.props.selectedTab === 'dapp'}
                                onPress={()=>{
                                    // url.goPage(url.DApp,"")
                                    if(!config.isZH()){
                                        url.goPage(url.browser("https://pofid-boking.github.io/boking?"+new Date().getTime()))
                                    }else {
                                        url.goPage(url.browser("https://pofid-boking.gitee.io/boking?"+new Date().getTime()))
                                    }
                                }}
                            > </TabBar.Item>:""

                    }
                    <TabBar.Item
                        icon={<Icon type="iconwode"/>}
                        selectedIcon={<Icon type="iconwode" className="text-primary"/>}
                        title={lang.e().navbar.my}
                        key="my"
                        selected={this.props.selectedTab === 'my'}
                        onPress={()=>{
                            url.goPage(url.Personal,"")
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>

        </div>
    }
}

export default Layout