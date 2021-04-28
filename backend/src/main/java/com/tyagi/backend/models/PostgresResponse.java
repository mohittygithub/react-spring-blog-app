package com.tyagi.backend.models;

import java.util.List;




public class PostgresResponse {
    private int id;
	private int statusCode;
    private String message;
    private boolean success;
    private List<? extends Object> results;

    public PostgresResponse(){}

    public PostgresResponse(int id, int statusCode, String message, boolean success, List<? extends Object> results){
        this.id = id;
		this.statusCode = statusCode;
        this.message = message;
        this.success = success;
        this.results = results;
    }

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getStatusCode() {
		return this.statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isSuccess() {
		return this.success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public List<? extends Object> getResults() {
		return this.results;
	}

	public void setResults(List<Object> results) {
		this.results = results;
	}

}
