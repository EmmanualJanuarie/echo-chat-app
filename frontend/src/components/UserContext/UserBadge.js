import React from "react";

const UserBadge = ({ user, handleFunction}) =>{
    return(
        <div>
            <span class="tag is-warning is-medium">
                {user.flname}
                <button class="delete is-small" onClick={handleFunction}></button>
            </span>
        </div>
    )
};

export default UserBadge;