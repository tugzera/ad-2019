/**
 * Display a listing of the resource.
 */
export function findMany(refreshing = false) {
  return {
    type: "@friends/BROWSE_REQUEST",
    payload: { refreshing },
  };
}

/**
 * Display the specified resource.
 */
export function findOne(id) {
  return {
    type: "@friends/READ_REQUEST",
    payload: { id },
  };
}

/**
 * Store a newly created resource in storage.
 */
export function store(data) {
  return {
    type: "@friends/ADD_REQUEST",
    payload: { data },
  };
}

/**
 * Update the specified resource in storage.
 */
export function update(id, data) {
  return {
    type: "@friends/EDIT_REQUEST",
    payload: { id, data },
  };
}

/**
 * Remove the specified resource from storage.
 */
export function destroy(id) {
  return {
    type: "@friends/DESTROY_REQUEST",
    payload: { id },
  };
}
