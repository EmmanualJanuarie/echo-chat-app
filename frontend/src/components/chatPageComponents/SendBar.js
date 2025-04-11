import Card from "./Card";
import Column from "../Column";
import Columns from "../Columns";
import Clip from "./Clip";
import VoiceNote from "./VoiceNote";
import Input from "../Input";
import SendIcon from "./SendIcon";
import  '../../styles/ChatAppPage.css';
function SendBar({ value, onChange, onSubmit, onKeyDown , onClick , handleImageChange}){
    return(
        <div>
            <Card  position={'absolute'} height={'35px'} borderRadius={'20px'} backgroundColor={'#f0f2f7'} border={'1px solid black'}
            bottom={'6px'}>
                
                    <Columns gap={'87%'} position={'relative'} left={'20px'}>
                        {/* First set of columns */}
                        <Columns>
                            {/* Second Column */}
                            <Column>
                            <form >
                                <input className="reply-input" type="text" name="reply" placeholder="Type repsonse message here..."
                                        value={value} onChange={onChange} onKeyDown={onKeyDown} />
                            
                            </form>

                            </Column>
                        </Columns>

                        {/* Second Set of columns */}
                        <Columns gap={'60%'}>
                            {/* First Column */}
                            <Column>
                                <VoiceNote position={'absolute'} textAlign={'left'}  bottom={'6px'} fontSize={'25px'}/>
                            </Column>

                            {/* First Column */}
                            <Column>
                                <Clip position={'absolute'} textAlign={'left'}  bottom={'6px'} fontSize={'25px'}
                                onClick={onClick} handleImageChange={handleImageChange}/>
                            </Column>

                            
                        </Columns>
                    </Columns>


            </Card>
        </div>
    );
}

export default SendBar;