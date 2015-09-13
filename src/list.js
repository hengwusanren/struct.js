/**
 * List
 */
function ListNode(val, next) {
    this.val = val;
    this.next = next || null;
}
ListNode.reverse = function(head) {
	if(head === null || head.next === null) return head;
	var p = head;
	var q = p.next;
	var t = null;
	while(true) {
		p.next = t;
		if(q === null) break;
		t = p;
		p = q;
		q = q.next;
	}
	return p;
};
ListNode.median = function(head) {
	if(head === null || head.next === null) return head;
	var p = head, q = head.next;
    while(q !== null && q.next !== null) {
        p = p.next;
        q = q.next.next;
    }
	return p;
};
