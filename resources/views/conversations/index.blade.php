@extends('layouts.app')

@section('content')

    @if(isset($conversation))
        <conversation-dashboard :id="{{ $conversation->id }}"/>
    @else
        <conversation-dashboard/>
    @endif

@endsection
