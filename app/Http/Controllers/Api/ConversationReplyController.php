<?php

namespace App\Http\Controllers\Api;

use App\Conversation;
use App\Http\Controllers\Controller;
use App\Transformers\ConversationTransformer;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use App\Http\Requests\StoreConversationReplyRequest;

class ConversationReplyController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth']);
    }

    /**
     * @param StoreConversationReplyRequest $request
     * @param Conversation $conversation
     * @return mixed
     */
    public function store(StoreConversationReplyRequest $request,Conversation $conversation)
    {

        try {
            $this->authorize('reply', $conversation);
        } catch (AuthorizationException $e) {
             return back();
        }

        $reply = new Conversation;
        $reply->body = $request->body;
        $reply->user()->associate($request->user());
        $conversation->replies()->save($reply);
        $conversation->touchLastReply();

        return fractal()
            ->item($reply)
            ->parseIncludes(['user', 'parent','parent.user','parent.users'])
            ->transformWith(new ConversationTransformer)
            ->toArray();

    }
}
