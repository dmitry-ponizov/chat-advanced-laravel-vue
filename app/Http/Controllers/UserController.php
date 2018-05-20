<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers()
    {
        return User::where('name', 'like', '%' . request()->search . '%')->get()->toArray();
    }
}
