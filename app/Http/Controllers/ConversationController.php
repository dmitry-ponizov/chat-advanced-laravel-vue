<?php

namespace App\Http\Controllers;

use App\Conversation;
use App\Http\Requests\StoreConversationRequest;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index()
    {
        return view('conversations.index');
    }

    public function show(Conversation $conversation)
    {
        try {
            $this->authorize('show', $conversation);

        } catch (AuthorizationException $e) {
        }

        return view('conversations.index',compact('conversation'));
    }



}
