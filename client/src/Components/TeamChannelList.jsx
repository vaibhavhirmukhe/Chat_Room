import React from 'react';
import { AddChannel } from '../assets';
// import { useChannelStateContext, useChatContext } from 'stream-chat-react';

const TeamChannelList = ({children, error = false, loading, type ,isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    // const [isAdmin, setIsAdmin] = useState(false);
    // const { channel, client } = useChatContext();

    // useEffect(() => {
    //     const checkAdmin = async () => {
    //         if (channel) {
    //             const isAdmin = Object.values(channel.state.members).find(
    //                 (member) => member.user.id === channel.client.userID && member.role === 'admin'
    //             );
    //             setIsAdmin(isAdmin ? true : false);
    //         }
    //     }
    //     checkAdmin();
    // }, [channel]);

    // console.log(isAdmin);
    if(error){
        return type ==='team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection error, please wait a moment and try again.
                </p>
            </div>
        ) : null
    }

    if(loading){
        return(
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {type ==="team" ? "Channels" : "Messages"} loading...
                </p>
            </div> 
        )
    }

  return (
    <div className='team-channel-list'>
        <div className="team-channel-list__header">
            <p className="team-channel-list__header__title">
                {type ==="team" ? "Channels" : "Direct Messages"}
            </p>
           <AddChannel 
                isCreating = {isCreating}
                setIsCreating = {setIsCreating}
                setCreateType = {setCreateType}
                setIsEditing = {setIsEditing}
                type = {type ==='team' ? 'team':'messaging'}
                setToggleContainer = {setToggleContainer}
            />
        </div>
        {children}
    </div>
  )
}

export default TeamChannelList