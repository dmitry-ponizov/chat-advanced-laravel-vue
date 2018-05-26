<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

use App\Conversation;
use Illuminate\Support\Facades\Broadcast;

//Broadcast::channel('App.User.{id}', function ($user, $id) {
//    return (int) $user->id === (int) $id;
//});


Broadcast::channel('user.*',function ($user){
    return ['id'=> $user->id];
});

Broadcast::channel('conversation.*', function ($user) {
    return ['id'=> $user->id];
});