<?php

namespace App\Http\Controllers\Api;

use App\Conversation;
use App\Events\ConversationUsersCreated;
use App\Http\Requests\StoreConversationUserRequest;
use App\Transformers\ConversationTransformer;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ConversationUserController extends Controller
{
    /**
     * @param StoreConversationUserRequest $request
     * @param Conversation $conversation
     * @return mixed
     */
    public function store(StoreConversationUserRequest $request, Conversation $conversation)
    {
        try {
            $this->authorize('affect');
        } catch (AuthorizationException $e) {

        }

        $conversation->users()->syncWithoutDetaching($request->recipients);

        $conversation->load(['users']);

        broadcast(new ConversationUsersCreated($conversation))->toOthers();

        return fractal()
            ->item($conversation)
            ->parseIncludes(['user', 'users'])
            ->transformWith(new ConversationTransformer)
            ->toArray();
    }
}
