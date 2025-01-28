<?php

use App\Models\Engine;
use App\Models\User;

test('user can view all engines', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get('/engines');
    $response->assertOk();
});

test('user can create an engine', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/engines', [
            'name' => 'V8 Engine',
        ]);

    $response->assertSessionHasNoErrors()
        ->assertRedirect('/engines');

    $this->assertDatabaseHas('engines', [
        'name' => 'V8 Engine',
    ]);
});

test('engine name must be unique', function () {
    $user = User::factory()->create();
    Engine::factory()->create(['name' => 'Duplicate Engine']);

    $response = $this
        ->actingAs($user)
        ->post('/engines', [
            'name' => 'Duplicate Engine',
        ]);

    $response->assertSessionHasErrors('name');
});

test('user can update an engine', function () {
    $user = User::factory()->create();
    $engine = Engine::factory()->create(['name' => 'Old Engine']);

    $response = $this
        ->actingAs($user)
        ->put("/engines/{$engine->id}", [
            'name' => 'Updated Engine',
        ]);

    $response->assertSessionHasNoErrors()
        ->assertRedirect('/engines');

    $this->assertDatabaseHas('engines', [
        'id' => $engine->id,
        'name' => 'Updated Engine',
    ]);
});

test('user can delete an engine', function () {
    $user = User::factory()->create();
    $engine = Engine::factory()->create();

    $response = $this->actingAs($user)->delete("/engines/{$engine->id}");

    $response->assertRedirect('/engines');

    $this->assertDatabaseMissing('engines', [
        'id' => $engine->id,
    ]);
});
