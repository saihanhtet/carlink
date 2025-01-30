<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $profile = Profile::where('user_id', $request->user()->id)->firstOrFail();
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'profile' => $profile,
            'status' => session('status'),
        ]);
    }

    public function show(Request $request)
    {
        $profile = $request->user()->profile;

        if (!$profile) {
            return response()->json(['message' => 'Profile not found.'], 404);
        }

        return response()->json(['profile' => $profile], 200);
    }
    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        // Update User model fields
        $user->fill($request->only(['name', 'email']));
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        $user->save();

        // Update Profile model fields
        $profileData = $request->only(['avatar', 'phone', 'address', 'birth_date']);
        if ($request->hasFile('avatar')) {
            $profileData['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }
        // Update the user's profile
        $profile = $user->profile;
        if ($profile) {
            $profile->update($profileData); // Update the profile
        } else {
            // Handle cases where the profile doesn't exist (optional)
            $profileData['user_id'] = $user->id;
            Profile::create($profileData);
        }

        return Redirect::route('profile.edit')->with('status', 'Profile updated successfully.');
    }

    public function updateStatus(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'id' => 'required|exists:users,id',
            'status' => 'required|string|in:active,banned',
            'is_admin' => 'required|boolean',
        ]);

        $user = User::findOrFail($validated['id']);
        $user->update([
            'status' => $validated['status'],
            'is_admin' => $validated['is_admin'],
        ]);

        return Redirect::route('user-management-dashboard')->with('status', 'User updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
