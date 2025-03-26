import ExternalCard from "../components/ExternalCard";
import Header from "../components/Header";
import Columns from "../components/Columns";
import Column from "../components/Column";
import Button from "../components/Button";
import EchoTextLogo from "../components/EchoTextLogo";
import '../styles/ChatAppPage.css';
function ChatAppPage(){
    return(
        <div>
            <ExternalCard backgroundColor={'transparent'} border={'2px solid black'} borderRadius={'25px'}
                height={'50vh'}    
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

                      {/* new header */}
                      <Columns displat={'flex'}  position={'relative'} left={'13px'}>
                            {/* First Header*/}
                            <Column>
                                    <Header backgroundColor={'white'} margin={'0px'} padding={'0px'} borderRadius={'0px'}>
                                            {/* Add content here */}
                                    </Header>
                            </Column>

                            {/* Second Header */}
                            <Column>
                                <div className="width-is-100">
                                <Header backgroundColor={'white'} margin={'0px'} padding={'0px'} borderRadius={'0px'}>
                                    {/* Add content here */}
                                </Header>
                                </div>
                            </Column>

                            {/* Third Header*/}
                            <Column>
                                <Header backgroundColor={'white'} margin={'0px'} padding={'0px'} borderRadius={'0px'}>
                                    {/* Add content here */}
                                </Header>
                            </Column>
                        </Columns>
                </div>
            </ExternalCard>
        </div>
    );
}

export default ChatAppPage;