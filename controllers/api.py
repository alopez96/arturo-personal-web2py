import tempfile

def get_users():
    users = []
    for r in db(db.contact_info).select(orderby=~db.contact_info.sent_on):
        t = dict(
            name = r.name,
            email = r.email,
            reason = r.reason,
            best_time = r.best_time,
            sent_on = r.sent_on,
        )
        users.append(t)
    return response.json(dict(users = users))

def sign_up_user():
    t_id = db.contact_info.insert(
        name = request.vars.name,
        email = request.vars.email,
        reason = request.vars.reason,
        best_time = request.vars.best_time,
    )
    t = db.contact_info(t_id);
    return response.json(dict(users = t))
