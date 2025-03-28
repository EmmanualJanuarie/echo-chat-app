import ExternalCard from "../components/ExternalCard";
import Header from "../components/Header";
import Columns from "../components/Columns";
import Column from "../components/Column";
import Button from "../components/Button";
import EchoTextLogo from "../components/EchoTextLogo";
import ChatIcon from "../components/chatPageComponents/ChatIcon";
import CallIcon from "../components/chatPageComponents/CallIcon";
import GroupIcon from "../components/chatPageComponents/GroupIcon";
import Avatar from "../components/chatPageComponents/Avatar";
import Heading from "../components/chatPageComponents/Heading";
import VideoCallIcon from "../components/chatPageComponents/VideoCall";
import ElispsesIcon from "../components/chatPageComponents/Elipses";
import SearchBar from "../components/chatPageComponents/SearchBar";
import SendBar from "../components/chatPageComponents/SendBar";
import '../styles/ChatAppPage.css';
import avatarImg from '../assets/default_avatar.png'; 
function ChatAppPage(){
    return(
        <div>
            <ExternalCard backgroundColor={'#f0f2f7'} border={'2px solid black'} borderRadius={'25px'}
                height={'90vh'} position={'absolute'} bottom={'30px'}
            >
                <div className="card-width-98">
                    <Header backgroundColor={'white'} margin={'15px'} padding={'0px'} marginBottom={'10px'}
                        borderRadius={'20px 20px 0 0'}
                    >
                        <Columns gap={'85%'}>
                            {/* Image of logo - First Column */}
                                <Column>
                                    <EchoTextLogo />
                                </Column>

                            {/* Second Column - logo out button */}
                            <Column>
                                <Button type={'submit'} backgroundColor={'black'} width={'100%'} height={'35px'} color={'white'} content={'Log Out'}/>
                            </Column>
                        </Columns>
                    </Header>
                </div>

                <div className="card-width-98">
                        <Columns  margin={'none'} padding={'none'} position={'relative'} left={'15px'}>
                            {/* First Column */}
                            <div className="width-is-25">
                                <Column>
                                    <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'}>

                                        <Columns gap={'3%'} position={'relative'} right={'20px'}>
                                            <Column>
                                                <ChatIcon position={'absolute'} textAlign={'left'} bottom={'0px'} fontSize={'30px'} zIndex={'1px'}/>
                                            </Column>

                                            <Column>
                                                <CallIcon position={'absolute'} textAlign={'left'}  bottom={'0px'} fontSize={'30px'}/>
                                            </Column>

                                            <Column>
                                                <GroupIcon position={'absolute'} textAlign={'left'}  bottom={'0px'} fontSize={'30px'}/>
                                            </Column>

                                            <Column>
                                                <Avatar src={avatarImg} alt={'Default avatar image'}
                                                        position={'absolute'} textAlign={'left'}  bottom={'0px'} 
                                                        height={'30px'} width={'30px'} borderRadius={'50%'} border={'1px solid gray'}
                                                        objectFit={'cover'} backgroundColor={'#abb1bf'}
                                                />
                                            </Column>
                                        </Columns>
                                    </Header>
                                </Column>
                            </div>
                
                            {/* Second Column */}
                            <div className="width-is-70">
                                <Column>
                                    <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'}>
                                        <Columns gap={'87%'} position={'relative'} left={'20px'}>
                                            {/* First set of columns */}
                                            <Columns>
                                                {/* First Column */}
                                                <Column>
                                                    <Avatar src={avatarImg} alt={'Default avatar image'}
                                                        position={'absolute'} textAlign={'left'}  bottom={'-9px'} 
                                                        height={'40px'} width={'40px'} borderRadius={'50%'} border={'1px solid gray'}
                                                        objectFit={'cover'}
                                                    />
                                                </Column>

                                                {/* Second Column */}
                                                <Column>
                                                    <Heading content={'John Doe'} fontSize={'20px'} fontWeight={'bold'} color={'black'}
                                                        position={'absolute'} textAlign={'left'}  bottom={'5px'} left={'80px'}
                                                    />
                                                    <Heading content={'Last seen 3 hours ago'} fontSize={'15px'} color={'gray'}
                                                        position={'absolute'} textAlign={'left'}  bottom={'-10px'} left={'80px'}
                                                    />
                                                </Column>
                                            </Columns>

                                            {/* Second Set of columns */}
                                            <Columns gap={'60%'}>
                                                {/* First Column */}
                                                <Column>
                                                    <VideoCallIcon position={'absolute'} textAlign={'left'} bottom={'-3px'} fontSize={'30px'} />
                                                </Column>

                                                {/* Second Column */}
                                                <Column>
                                                    <ElispsesIcon position={'absolute'} textAlign={'left'} bottom={'-3px'} fontSize={'30px'} />
                                                </Column>
                                            </Columns>
                                        </Columns>
                                    </Header>
                                </Column>
                            </div>

                             {/* Third Column */}
                            <div className="width-is-25">
                                <Column>
                                    <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'}>
                                        <Heading content={'Notifications'} fontSize={'25px'} fontWeight={'bold'} color={'black'}
                                                            position={'absolute'} textAlign={'left'}  bottom={'5px'} left={'20px'}
                                                        />
                                        </Header>
                                </Column>
                            </div>
                        </Columns>
                </div>

                <div className="card-width-98">
                        <Columns  margin={'none'} padding={'none'} position={'relative'} left={'15px'}>
                            {/* First Column */}
                            <div className="width-is-25">
                                <Column>
                                    <Header backgroundColor={'#f0f2f7'} margin={'none'} padding={'none'} borderRadius={'0px'} height={'70vh'}>
                                        <Heading content={'Chats'} fontSize={'30px'} fontWeight={'bold'} color={'black'}
                                         position={'absolute'} textAlign={'left'} left={'30px'}/>

                                        <SearchBar position={'absolute'} top={'90px'}/>

                                    </Header>
                                </Column>
                            </div>
                
                            {/* Second Column */}
                            <div className="width-is-70">
                                <Column>
                                    <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'} height={'62vh'}>
                                        {/* chatting here */}
                                    </Header>

                                    <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'}>
                                        {/* send reply */}
                                        <SendBar />
                                    </Header>
                                </Column>
                            </div>

                             {/* Third Column */}
                            <div className="width-is-25">
                                <Column>
                                    <Header backgroundColor={'white'} margin={'none'} padding={'none'} borderRadius={'0px'} height={'70vh'}>
                                        
                                    </Header>
                                </Column>
                            </div>
                        </Columns>
                </div>

                
            </ExternalCard>
        </div>
    );
}

export default ChatAppPage;