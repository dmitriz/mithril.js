"use strict"

var o = require("../../ospec/ospec")
var stream = require("../stream")

o.spec("scanMerge", function() {
	o("defaults to seed", function() {
		var parent1 = stream()
		var parent2 = stream()

		var child = stream.scanMerge([
			[parent1, function(out, p1) {
				return out + p1
			}],
			[parent2, function(out, p2) {
				return out + p2
			}]
		], -10)

		o(child()).equals(-10)
	})

	o("defaults to seed with no pairs (tuples) passed", function() {

		var child = stream.scanMerge([], -10)

		o(child()).equals(-10)
	})


	o("accumulates as expected", function() {
		var parent1 = stream()
		var parent2 = stream()

		var child = stream.scanMerge([
			[parent1, function(out, p1) {
				return out + p1
			}],
			[parent2, function(out, p2) {
				return out + p2 + p2
			}]
		], "a")

		parent1("b")
		parent2("c")
		parent1("b")

		o(child()).equals("abccb")
	})

	o("works as scan on a single pair", function() {
		var parent1 = stream()

		var child = stream.scanMerge([
			[parent1, function(out, p1) {
				return out + p1
			}]
		], "a")

		parent1("b")
		parent1("cc")

		o(child()).equals("abcc")
	})
})
