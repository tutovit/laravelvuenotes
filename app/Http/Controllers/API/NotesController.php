<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Notes;
use Illuminate\Http\Request;
use App\Http\Requests\NotesRequest;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json([
            "notes" => Notes::all()
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  NotesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NotesRequest $request)
    {
        $obNotes = new Notes;
        $obNotes->name = $request->get('name');
        $obNotes->text = $request->get('text');

        return response()->json([
            "success" => $obNotes->save()
        ],200);;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
