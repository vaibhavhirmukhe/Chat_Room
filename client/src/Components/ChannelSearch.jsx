import React, { useState, useEffect} from 'react'
import { useChatContext } from "stream-chat-react"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const ChannelSearch = () => {

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const getChannels = async()=>{
        try {
            // TODO : fetch channel
        } catch (error) {
            setQuery('');
        }
  }

  const onSearch = (event)=>{
        event.preventDefault();

        setLoading(true);
        setQuery(event.target.value);
        getChannels(event.target.value);
  }

  return (
    <div className='channel-search__container'>
        <div className="channel-search__input__wrapper">
            <div className='channel-search__input__icon'>
                <SearchOutlinedIcon style={{color:"rgba(255, 255, 255, 0.66)"}}/>
            </div>
            <input 
                className="channel-search__input__text" 
                type="text" 
                placeholder='Search'
                value={query}
                onChange={onSearch}
            />
        </div>
    </div>
  )
}

export default ChannelSearch